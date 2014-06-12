/*global exports,require*/(function () {    "use strict";    var config = require("../../config.js"),        data = require("../data"),        _ = require("lodash"),        utils = require("../utils"),        constant = require("../constant");    exports.home = function (req, res) {        var page = req.param("page");        var intPage = 1;        if (page) {            intPage = parseInt(page, 10)        }        if (intPage <= 0) {            intPage = 1;        }        data.Post.get_list_for_home(intPage, config.per_page_count, function (err, posts, total) {            var new_posts = [];            var uids = _.pluck(posts, "author");            data.User.get_list_by_uids(uids, function (err, users) {                _.forEach(posts, function (post) {                    var newItem = post.makeSimple();                    newItem.publish_date = utils.date_format.fullDateTime(post.create_date);                    var author = _.findLast(users, function (item) {                        return item.id === newItem.author;                    });                    newItem.author = author.makeSimple();                    new_posts.push(newItem);                });                var pagerHtml = utils.pager_render(intPage, total, config.per_page_count);                res.render('index.html', { title: '首页', posts: new_posts, total: total, pager: pagerHtml, current_nav: "home" });            });        });    };    exports.about = function (req, res) {        res.render('home/about.html', { title: '关于我们', current_nav: "about" });    };    exports.donate = function (req, res) {        res.render('home/donate.html', { title: '捐赠', current_nav: "donate"});    };    exports.sample = function (req, res) {        res.render('../static/sample/index.html', { title: '', layout: false });    };    exports.showcase = function (req, res) {        res.render('../static/showcase/index.html', { title: '', layout: false });    };    exports.doc_home = function (req, res) {        res.render('../static/docs/index.html', { title: '', layout: false });    };    exports.doc_guide = function (req, res) {        res.redirect("/docs/guide");    };})();