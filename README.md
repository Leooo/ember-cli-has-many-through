# Ember-cli-has-many-through

Given an Ember-Data `parent` model with a `hasMany` `children` relationship that itself has a `hasMany` `childrenofchild` relationship,
then you can use the `hasManyThrough` computed property provided by this add-on to concatenate all the `childrenofchild` of `child` models
into a single `childrenofchild` property on the `parent` model.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember serve`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
