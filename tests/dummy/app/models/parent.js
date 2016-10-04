import DS from 'ember-data';
import hasManyThrough from 'dummy/macros/has-many-through';
import hasManyThroughNonObject from 'dummy/macros/has-many-through-non-object';

export default DS.Model.extend({
  children: DS.hasMany('child'),
  childrenOfChild: hasManyThrough('children'),
  childrenOfChildren: hasManyThrough('children', 'childrenOfChild'),
  childrenOfChildArray: hasManyThrough('children'),
  simpleArray: hasManyThroughNonObject('children')
});
