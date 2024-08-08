import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

function currentUser() {
  return <T extends { new (...args: any[])}>(constructor: T) => {
    return class extends constructor {
      currentUser = {
        name: 'Alex'
      }
    }
  }
}
