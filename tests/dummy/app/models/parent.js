import DS from 'ember-data';
import hasManyThrough from 'dummy/macros/has-many-through';

export default DS.Model.extend({
  children: DS.hasMany('child'),
  childrenOfChild: hasManyThrough('children'),
  childrenOfChildren: hasManyThrough('children', 'childrenOfChild'),
  childrenOfChildArray: hasManyThrough('children')
});
