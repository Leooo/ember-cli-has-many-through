import Ember from 'ember';
import DS from 'ember-data';
const {computed, RSVP} = Ember;

/**
  @method hasManyThrough
  @param hasMany child
  @param hasMany childOfChild
*/

export default function (...args) {
  let childKey = args[0],
    childOfChildKey = args[1];

  // dont key on `${childKey}.@each.${childOfChildKey}` or it will be run several times
  // BUT implemented that way it wouldn't update when childOfChildKey records are
  // deleted without the observer `notify${childKey.classify()}OnDelete`
  return computed(`${childKey}.@each`, function (key) {
    childOfChildKey = childOfChildKey || key;
    return DS.PromiseArray.create({
      promise: this.get(childKey).then((children) => {
        let all = [],
          res = [];

        children.forEach((child) => {
          // takes into account the case where the hasMany on the child
          // is not a promise (MF.Array for example)
          let prom = child.get(childOfChildKey).then
            ? child.get(childOfChildKey)
            : RSVP.resolve(child.get(childOfChildKey));

          all.pushObject(
            prom.then((childrenOfChild) => {
              childrenOfChild.forEach((item) => {
                let observerName = `notify${childKey.classify()}OnDelete`,
                  self = this;

                // make sure property is updated when a childofchild is deleted
                if (item.isDeleted && !item.get(observerName)) {
                  item.addObserver('isDeleted', function () {
                    self.notifyPropertyChange(key);
                  });
                }
              }, this);
              res.pushObjects(childrenOfChild.toArray());
            })
          );
        });
        return RSVP.all(all).then(() => {
          // remove duplicates
          return res.filter(function (item, pos) {
            return res.indexOf(item) === pos
            && (!item.isDeleted || !item.get('isDeleted'));
          });
        });
      })
    });
  });
}
