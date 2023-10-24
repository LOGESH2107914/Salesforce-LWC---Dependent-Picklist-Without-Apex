import { LightningElement,wire,api,track } from 'lwc';

import { getPicklistValues } from "lightning/uiObjectInfoApi";
import Region_FIELD from "@salesforce/schema/Account.Region__c";
import SubRegion_FIELD from "@salesforce/schema/Account.Subregion__c";

export default class DependentPicklistLWCDemo extends LightningElement {
    @track regionPicklistData=[];
    @track regionSubPicklistData
    @track finalregionSubPicklistData


    @wire(getPicklistValues, {recordTypeId: "012000000000000AAA", fieldApiName: Region_FIELD })
    wiredregionPicklistData({data,error}){
        if(data){
            console.log('Region Picklist Daata::',data);
            this.regionPicklistData = data;
        }
        else if(error){
            console.error(error);
        }
    }

    @wire(getPicklistValues, {recordTypeId: "012000000000000AAA", fieldApiName: SubRegion_FIELD })
    //subregionPicklistData;
    SubregionPicklistData({data,error}){
        if(data){
            console.log('Sub Region Picklist Daata::',data);
            this.regionSubPicklistData = data;

        }
        else if(error){
            console.error(error);
        }
    }
 
    handleRegionChange(event){
        console.log('Entered handleRegionChange');
        let key = this.regionSubPicklistData.controllerValues[event.target.value];
//this.countyOptions = this.countryFieldData.values.filter(opt => opt.validFor.includes(key));
        this.finalregionSubPicklistData = this.regionSubPicklistData.values.filter(opt => opt.validFor.includes(key));
        console.log('Dependent Country Picklists Values:::',this.finalregionSubPicklistData);
    }

    handleSubRegionChange(event){
        //Do Nothing
    }

}