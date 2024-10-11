import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Ajoutez cette ligne
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Ajoutez HttpClientModule ici
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
