import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  childrenOfChild: DS.hasMany('childOfChild'),
  childrenOfChildArray: Ember.A([])
});
