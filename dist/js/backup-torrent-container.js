"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uniqid = require("uniqid");

var _uniqid2 = _interopRequireDefault(_uniqid);

var _torrent = require("./torrent");

var _torrent2 = _interopRequireDefault(_torrent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BackupTorrents = function (_Component) {
	_inherits(BackupTorrents, _Component);

	function BackupTorrents(props) {
		_classCallCheck(this, BackupTorrents);

		var _this = _possibleConstructorReturn(this, (BackupTorrents.__proto__ || Object.getPrototypeOf(BackupTorrents)).call(this, props));

		_this.handleReload = function () {
			_this.props.setPlayerLoading(true);
			_this.props.resetClient(true).then(function (result) {
				var movie = _this.props.movie;
				movie.magnet = false;
				_this.props.searchTorrent(movie);
			}).catch(function (err) {
				return console.log(err);
			});
			_this.props.closeBackup();
		};

		return _this;
	}

	_createClass(BackupTorrents, [{
		key: "shouldComponentUpdate",
		value: function shouldComponentUpdate(nextProps, nextState) {
			if (nextProps.torrents !== this.props.torrents || nextProps.movie.magnet !== this.props.movie.magnet) {
				return true;
			}

			return false;
		}
	}, {
		key: "render",
		value: function render() {
			var _this2 = this;

			var torrents = this.props.torrents ? this.props.torrents.map(function (torrent) {
				var title = torrent.title;
				var videoQuality = torrent.resolution || torrent.quality;

				return _react2.default.createElement(_torrent2.default, {
					key: (0, _uniqid2.default)(),
					torrent: torrent,
					name: "torrent " + (_this2.props.getCurrentMagnet() == torrent.magnet ? "active" : ""),
					videoQuality: videoQuality,
					title: title,
					handleTorrentClick: _this2.props.handleTorrentClick
				});
			}) : "";
			return _react2.default.createElement(
				"div",
				{ className: "backup-container" },
				_react2.default.createElement(
					"div",
					{ className: "title" },
					"Torrents"
				),
				_react2.default.createElement(
					"div",
					{ className: "subtitle" },
					this.props.torrents ? "Select from one of the alternative torrents for \"" + this.props.movie.title + "\" below." : "We couldn't find any alternative torrents. Please wait or try again."
				),
				this.props.torrents ? _react2.default.createElement(
					"div",
					{ className: "torrent-container" },
					torrents
				) : false,
				_react2.default.createElement(
					"div",
					{ className: "reload-btn", onClick: this.handleReload },
					_react2.default.createElement(
						"span",
						null,
						"Reload"
					)
				)
			);
		}
	}]);

	return BackupTorrents;
}(_react.Component);

exports.default = BackupTorrents;