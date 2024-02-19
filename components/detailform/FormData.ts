import { categoryData } from "../data/CategoryData";
import { districtList } from "../data/DistrictList";


export const personalData=[
    {
        id:1,
        name:"firstName",
        placeholder:"First Name",
        type:"text",
    },
    {
        id:2,
        name:"middlename",
        placeholder:"Middle Name",
        type:"text",        
    },
    {
        id:3,
        name:"lastname",
        placeholder:"Last Name",
        type:"text",
    },
    {
        id:4,
        name:"email",
        placeholder:"Email",
        type:"email",       
    },
    {
        id:5, 
        name:"phone",
        placeholder:"Phone",
        type:"text",
    },
    {
        id:6, 
        name:"dob",
        placeholder:"Date of Birth",
        type:"date",
    },
    {
        id:7,
        name:"gender",
        placeholder:"Select Gender",
        type:"select",
        options:[{name:"Male", value:'male'}, { name:'Female', value:"female"}, {name:"Other", value:"other"}]
    },
    {
        id:8,
        name:"bloodgroup",
        placeholder:"Select Blood Group",
        type:"select",
        options:[{name:"A+", value:'A+'}, { name:'A-', value:"A-"}, {name:"B+", value:"B+"}, {name:"B-", value:"B-"}, {name:"AB+", value:"AB+"}, {name:"AB-", value:"AB-"}, {name:"O+", value:"O+"}, {name:"O-", value:"O-"}]
    },
    {
        id:9,
        name:"guardiansname",
        placeholder:"Guardian's Full Name",
        type:"text",
    },
    {
        id:10,
        name:"guardiansrelation",
        placeholder:"Select Guardian's Relation",
        type:"select",
        options:[{name:"Father", value:'father'}, { name:'Mother', value:"mother"}]
    },
    
];
export const educationData=[
    {
        id:1,
        name:"education",
        placeholder:"Select your latest education degree",
        type:"select",
        options:[{name:'None', value:"none"},{name:"Basic", value:"basic"},{name:"High School", value:'highschool'}, { name:'Intermediate', value:"intermediate"}, {name:"Graduate", value:"graduate"}, {name:"Post Graduate", value:"postgraduate"}]
    },
    {
        id:2, 
        name:"occupation",
        placeholder:"Select Occupation",
        type:"select",
        options:[{name:"Student", value:'student'}, { name:'Employed', value:"employed"}, {name:"Unemployed", value:"unemployed"}, {name:"Retired", value:"retired"}, {name:"others", value:"others"}]
    }
]

export const temporaryaddressData=[
    {
       id:1,
        name:"province",
        placeholder:"Select Province",
        type:"select",
        option:"tprovince"
    },
    {
        id:2,
        name:"district",
        placeholder:"Select District",
        type:"select",
        option:"tdistrict"
    },
    {
        id:3,
        name:"municipality",
        placeholder:"Select Municipality",
        type:"select",
        option:"tmunicipality"

    },
    {
        id:4,
        name:"ward",
        placeholder:"Ward No.",
        type:"number",

    },
    {
        id:5,
        name:"city",
        placeholder:"City",
        type:"text",

    },
    {
        id:5,
        name:"tole",
        placeholder:"Tole",
        type:"text",

    }
]

export const peraddressData=[
    {
       id:1,
        name:"province",
        placeholder:"Select Province",
        type:"select",
        option:"pprovince"
        
    },
    {
        id:2,
        name:"district",
        placeholder:"Select District",
        type:"select",
        option:"pdistrict"
    },
    {
        id:3,
        name:"municipality",
        placeholder:"Select Municipality",
        type:"select",
        option:"pmunicipality"
    
    },
    {
        id:4,
        name:"ward",
        placeholder:"Ward No.",
        type:"number",

    },
    {
        id:5,
        name:"city",
        placeholder:"City",
        type:"text",

    },
    {
        id:5,
        name:"tole",
        placeholder:"Tole",
        type:"text",

    }
]

export const citizenshipData=[
    {
        id:1,
        name:"citizenship_no",
        placeholder:"Citizenship Number",
        type:"text",
    },
    {
        id:2,
        name:"issue_date",
        placeholder:"Citizenship Issue Date",
        type:"date",
    },
    {
        id:3,
        name:"type",
        placeholder:"Citizenship Type",
        type:"select",
        options:[
            {name:"Descedants", value:"descedants" },
            {
                name:"Birth",
                value:"birth"
            },
            {
                name:"Adapted",
                value:"adapted"
            },
            {
                name:"Complimentary",
                value:"complimentary"
            }
        ]
    },
    {
        id:4,
        name:"issue_district",
        placeholder:"Citizenship Issue District",
        type:"select",
        options:districtList
    },
   
]

export const licenseData=[
    {
        id:1,
        name:"licenseno",
        placeholder:"License Number",
        type:"text",
    },
    {
        id:2,
        name:"issuedate",
        placeholder:"License Issue Date",
        type:"date",
    },
    {
        id:3,
        name:"expirydate",
        placeholder:"License Expiry Date",
        type:"date",
    },
    {
        id:4,
        name:"office",
        placeholder:"License Issue Office",
        type:"select",
        options:districtList
    },
]

export const licenseCategoryData={
        id:5,
        name:"category",
        placeholder:"License Category",
        type:"select",
        options: categoryData.map((category)=>({id: category.category, label:category.category, value:category.category}))
}