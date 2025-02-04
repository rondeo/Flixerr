"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Fade = require("react-reveal/Fade");

var _Fade2 = _interopRequireDefault(_Fade);

var _fastAverageColor = require("fast-average-color");

var _fastAverageColor2 = _interopRequireDefault(_fastAverageColor);

var _uniqid = require("uniqid");

var _uniqid2 = _interopRequireDefault(_uniqid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MovieItem = function (_Component) {
    _inherits(MovieItem, _Component);

    function MovieItem(props) {
        _classCallCheck(this, MovieItem);

        var _this = _possibleConstructorReturn(this, (MovieItem.__proto__ || Object.getPrototypeOf(MovieItem)).call(this, props));

        _this.strip = function (string, chars) {
            return string.substring(0, chars);
        };

        _this.loadImage = function () {
            _this.setState({
                backdrop: "" + (_this.props.fallback ? _this.backdropImageURL : _this.imageURL)
            });
        };

        _this.handleImage = function () {
            _this.image = new Image();
            _this.imageURL = _this.props.movie.poster_path ? "https://image.tmdb.org/t/p/w780" + _this.props.movie.poster_path : "https://image.tmdb.org/t/p/w780" + _this.props.movie.backdrop_path;
            _this.image.src = _this.imageURL;

            var image = new Image();
            image.src = "https://image.tmdb.org/t/p/w300" + _this.props.movie.backdrop_path;

            var fac = new _fastAverageColor2.default();

            fac.getColorAsync(image, { algorithm: "sqrt" }).then(function (color) {
                if (!_this.unMounting) {
                    _this.setState({ averageColor: color });
                }
            }).catch(function (err) {
                return console.log(err);
            });

            if (_this.props.fallback) {
                _this.backdropImage = new Image();
                _this.backdropImageURL = "https://image.tmdb.org/t/p/original" + _this.props.movie.backdrop_path;
                _this.backdropImage.src = _this.backdropImageURL;
                _this.backdropImage.onload = _this.loadImage;
            } else {
                _this.image.onload = _this.loadImage;
            }
        };

        _this.handleMovieClick = function () {
            var movie = _this.props.movie;
            movie.averageColor = _this.state.averageColor;
            _this.props.openBox(movie);
        };

        _this.getMovieRating = function (className) {
            return _react2.default.createElement(
                "div",
                { key: (0, _uniqid2.default)(), className: "movie-item-star" },
                _react2.default.createElement("i", { className: "mdi mdi-light " + className })
            );
        };

        _this.loopStars = function (starArray, limit, className) {
            for (var i = 0; i < limit; i++) {
                starArray.push(_this.getMovieRating(className));
            }
        };

        _this.getStars = function () {
            var amountOfStars = _this.props.movie.vote_average / 10 * 5,
                nearestHalf = Math.round(amountOfStars * 2) / 2,
                floored = Math.floor(nearestHalf),
                difference = Math.floor(5 - nearestHalf),
                stars = [];

            _this.loopStars(stars, floored, "mdi-star");
            if (nearestHalf - floored !== 0) {
                stars.push(_this.getMovieRating("mdi-star-half"));
            }
            _this.loopStars(stars, difference, "mdi-star-outline");

            return stars;
        };

        _this.state = {
            averageColor: {
                hex: "#000",
                value: [0, 0, 0]
            },
            backdrop: false,
            fontSize: 1,
            stars: 1
        };
        return _this;
    }

    _createClass(MovieItem, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.setState({
                fontSize: -0.0195 * this.props.movie.title.length + 1.6,
                stars: this.getStars()
            });
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.unMounting = true;
            if (this.props.fallback) {
                if (this.backdropImage) {
                    this.backdropImage.onload = false;
                }
            } else {
                if (this.image) {
                    this.image.onload = false;
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                _Fade2.default,
                { distance: "10%", bottom: true },
                _react2.default.createElement(
                    "div",
                    { className: "movie-item", onClick: this.handleMovieClick },
                    _react2.default.createElement(
                        "div",
                        {
                            className: "movie-item-desc",
                            style: {
                                backgroundColor: this.state.averageColor ? "rgba(" + this.state.averageColor.value[0] + ", " + this.state.averageColor.value[1] + ", " + this.state.averageColor.value[2] + ", 0.4)" : 'rgba(0,0,0,0.1)'
                            } },
                        _react2.default.createElement(
                            "div",
                            {
                                className: "movie-item-title",
                                style: {
                                    fontSize: this.state.fontSize + "em"
                                } },
                            this.props.movie.title
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "movie-item-summary" },
                            this.strip(this.props.movie.overview, 80) + "..."
                        ),
                        _react2.default.createElement(
                            "div",
                            { className: "movie-item-stars" },
                            this.state.stars
                        )
                    ),
                    _react2.default.createElement("div", { className: "movie-item-bg" }),
                    _react2.default.createElement("img", {
                        className: "movie-item-blurred",
                        src: "https://image.tmdb.org/t/p/" + (this.props.fallback ? "w300" : "w92") + (this.props.fallback ? this.props.movie.backdrop_path : this.props.movie.poster_path),
                        onLoad: this.handleImage }),
                    " ",
                    this.state.backdrop ? _react2.default.createElement("img", {
                        className: "movie-backdrop" + (this.state.backdrop ? " movie-backdrop-show" : ""),
                        src: this.state.backdrop }) : ""
                )
            );
        }
    }]);

    return MovieItem;
}(_react.Component);

exports.default = MovieItem;