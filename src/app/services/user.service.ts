import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}


 

  private baseUrl = "http://localhost:8082/user";

  httpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  options = { headers: this.httpHeaders };


  addUser(user) {
    console.log(JSON.stringify(user));
    return this.http.post(`${this.baseUrl}/addUser`,JSON.stringify(user),this.options).pipe(
      catchError(this.errorHandler)
    );
  
  }

 

  addBooking(flightNumber,userId,passengers){
    return this.http.post(`${this.baseUrl}/addBooking/${userId}/${flightNumber}`,JSON.stringify(passengers),this.options)
    .pipe(catchError(this.errorHandler));
  }

 

  getBookingByUser(id){
    return this.http.get(this.baseUrl + "/getBookingByUser/" + id).pipe( catchError(this.errorHandler));
  }

 

  deleteBooking(bookingId,userId){
    return this.http.delete(this.baseUrl + "/deleteBooking/" + bookingId + "/" + userId).pipe(catchError(this.errorHandler));
  }

  
  
  updateUser(user){
    return this.http.post(this.baseUrl + "/updateUser",JSON.stringify(user),this.options).pipe(catchError(this.errorHandler));
  }

  

  getUser(id){
    return this.http.get(this.baseUrl + "/getUser/" + id).pipe(catchError(this.errorHandler));
  }

 

  getFlightByNumber(flightNumber){
    return this.http.get(`${this.baseUrl}/getFlightByNumber/${flightNumber}`).pipe(catchError(this.errorHandler));
  }

  updatePassenger(passenger){
    return this.http.post(`${this.baseUrl}/updatePassenger`,JSON.stringify(passenger),this.options).pipe(catchError(this.errorHandler));
  }






  userLogin(user):Observable<any> {
    console.log(JSON.stringify(user));
    return this.http
      .post<any>(this.baseUrl + "/userLogin", JSON.stringify(user), this.options)
      .pipe(catchError(this.errorHandler));
  }



  searchFlight(from,to,date): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/findFlight/${to}/${from}/${date}`).pipe(
      catchError(this.errorHandler)
    );
  }


  errorHandler(error:HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
