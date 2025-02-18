/*
 * Copyright "2025" Francisco Chicano, Javier Ferrer, Marina Calleja
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoUsuarioComponent } from './listado-usuario.component';

describe('ListadoUsuarioComponent', () => {
  let component: ListadoUsuarioComponent;
  let fixture: ComponentFixture<ListadoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListadoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
