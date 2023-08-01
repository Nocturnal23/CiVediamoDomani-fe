import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class SearchService {
    private _searchLocation: string = "Roma";
    private _searchLatitude: string = "12.492650148954052";
    private _searchLongitude: string = "41.890353287010065";

    get searchLocation(): string {
        return this._searchLocation;
    }

    set searchLocation(value: string) {
        this._searchLocation = value;
    }

    get searchLatitude(): string {
        return this._searchLatitude;
    }

    set searchLatitude(value: string) {
        this._searchLatitude = value;
    }

    get searchLongitude(): string {
        return this._searchLongitude;
    }

    set searchLongitude(value: string) {
        this._searchLongitude = value;
    }
}