import Ember from 'ember';
// import { inject as service } from '@ember/service';

export default Ember.Controller.extend({
  // session: service('session'),

  actions: {
    login(attrs) {

      let email = attrs.email
      let password = attrs.password

      Ember.$.ajax({
        url: 'http://localhost:3000/session',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
          email: email,
          password: password
        }),
        success: (response) => {
          // Handle successful response
          console.log('Login successful:', response);
          // document.cookie = `user_token=${response.token}`;
          sessionStorage.setItem('user_token', JSON.stringify(response.token));
          this.transitionToRoute('todo');
        },
        error: (e) => {
          // Handle error
          console.log('Login failed:', e);
          this.set('errors', e.responseJSON.errors);
        }
      });

    }
  }

  // actions: {
  //   login(attrs) {

  //     let email = attrs.email
  //     let password = attrs.password

  //     let loginUser = this.store.createRecord('session', {
  //       email: email,
  //       password: password
  //     });

  //     loginUser.save().then(() => {
  //       this.transitionToRoute('todo');
  //       console.log("login successful");
  //     }).catch((e) => {
  //       // alert(e.errors)
  //       this.set('errors', e.errors);
  //     })
  //   }
  // }
});
