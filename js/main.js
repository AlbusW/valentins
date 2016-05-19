/**
 * Created by Alice on 2016/5/9.
 */
require.config({
    paths: {
        "jquery": "jquery-1.12.2.min",
        "index": "index",
        "swiper": "swiper.min",
        "datepicker": "bootstrap-datepicker.min",
        "waypoints": "jquery.waypoints.min"
    },
    shim:{
        "waypoints": ["jquery"]
    }
});

require(["index"]);