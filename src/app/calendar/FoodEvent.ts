export class FoodEvent {
    public eventName : string;
    public user : string;
    public sanctioned : boolean;
    public startTime : string;
    public endTime : string;
    public description : string;
    public location : string;
    public organization : string;

    FoodEvent(eventName, user, sanctioned, startTime, endTime, description, location, organization) {
        this.eventName = eventName;
        this.user = user;
        this.sanctioned = sanctioned;
        this.startTime = startTime;
        this.endTime = endTime;
        this.description = description;
        this.location = location;
        this.organization = organization;
    } 
}