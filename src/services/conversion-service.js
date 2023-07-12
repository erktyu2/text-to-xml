const xml2js = require('xml2js');

const PERSON_TAG = 'P';
const FAMILY_TAG = 'F';
const ADDRESS_TAG = 'A';
const TELEPHONE_TAG = 'T';


module.exports = ConversionService  = {
    ConvertJsonToXML: (jsonText)=>{
        const builder = new xml2js.Builder({renderOpts: { pretty: true}, headless: true, emptyTag: ''});
        return builder.buildObject(jsonText);
    },
    ConvertPipedTextToJson: (text)=>{
        const personTexts = text.split('\nP|');

        const people = personTexts.map((t, index)=> (index !== 0 ? 'P|' : '') + t).reduce((acc, currentPText)=>{
            const segments = currentPText.split('\nF|');

            const [p, firstname, lastname ] = segments[0].split('\n')[0].split('|');
            const person = {
                firstname,
                lastname
            }

            const personalInfo = segments[0].split('\n').slice(1);
            personalInfo.forEach( personalInfo => _addTelephoneAndAddressToThePerson(person, personalInfo) );


            person.family = segments
                .slice(1).map(t => 'F|' + t)
                .reduce((accF, currentFText) => {
                    const familySegments = currentFText.split('\n');

                    const [f, name, born ] = familySegments[0].split('|');
                    const familyMember = {
                        name,
                        born
                    }

                    const familyMemberPersonalInfo = familySegments.slice(1);
                    familyMemberPersonalInfo.forEach(personalInfo => _addTelephoneAndAddressToThePerson(familyMember, personalInfo))

                    accF.push(familyMember);
                    return accF;
                }, [])

            acc.push({person});
            return acc;
        }, []);

        return {people};
    }


}

const _addTelephoneAndAddressToThePerson = (person, personalInfo) => {
    const personalInfoTag = personalInfo[0];

    if (personalInfoTag === TELEPHONE_TAG){
        let [t, ...telephoneNumbers] = personalInfo.split('|');

        let landline = [];
        let mobile = [];
        telephoneNumbers.forEach((currentTValue )=> {
            return _isMobile(currentTValue) ? mobile.push(currentTValue) : landline.push(currentTValue);
        })

        person.phone = {
            landline,
            mobile,
        };

    } else if (personalInfoTag === ADDRESS_TAG){
        let [a, street, city, zipcode] = personalInfo.split('|');

        if (!street && !city && !zipcode ) return;

        const address = {};
        if (street) address.street = street;
        if (city) address.city = city;
        if (zipcode) address.zipcode = zipcode;

        person.address = address;
    }
}

const _isMobile = (text) => {
    return !!text.split('-').join('').match(/^((((0{2}?)|(\+){1})46)|0)7[\d]{8}/);
}