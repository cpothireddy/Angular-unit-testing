import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

let testUrl = '/data';
interface Data {
  name: string;
}
describe('Http Client Testing Module', () => {
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    //HttpClientModule, is the http module which conatins all actuall http calls but,
    // HttpClientTestingModule will have all http mehtods but those will never do the actual call, theye will be jo entry in network call.
    httpClient = TestBed.inject(HttpClient);
  });
  it('should call the testUrl with get Request', () => {
    httpClient.get<Data>(testUrl).subscribe();
  });
});
