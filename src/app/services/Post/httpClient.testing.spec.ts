import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

let testUrl = '/data';
interface Data {
  name: string;
}
describe('Http Client Testing Module', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  //HttpTestingController is useful for making testing assertions.
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  it('should call the testUrl with get Request', () => {
    const testData: Data = { name: 'chandra pothireddy' };
    httpClient.get<Data>(testUrl).subscribe((data) => {
      expect(data).toEqual(testData);
    });
    const request = httpTestingController.expectOne('/data');
    request.flush(testData); // response provide on subscribe
    // flush(): Resolve the request by returning a body plus additional HTTP information (such as response headers) if provided. If the request specifies an expected body type, the body is converted into the requested type. Otherwise, the body is converted to JSON by default.
    expect(request.request.method).toBe('GET');
  });
});
