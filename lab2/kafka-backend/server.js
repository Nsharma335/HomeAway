var connection = new require("./kafka/Connection");

var login = require("./services/login");
var register = require("./services/register");
var updateProfile = require("./services/updateProfile");
var searchProperty = require("./services/searchProperty");
var addProperty = require("./services/addProperty");
var propertyListedByOwner = require("./services/propertyListedByOwner");
var getUserDetails = require("./services/getUserDetails");
var bookProperty = require("./services/bookProperty");
var travelerBookings = require("./services/travelerBookings");
var searchWithFilters = require("./services/searchWithFilters");
var sendMessage = require("./services/sendMessage");
var getMessage = require("./services/getMessage");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + res);
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("login_topic", login);
handleTopicRequest("register_topic", register);
handleTopicRequest("update_profile_topic", updateProfile);
handleTopicRequest("search_property_topic", searchProperty);
handleTopicRequest("add_property_topic", addProperty);
handleTopicRequest("owner_listing_property_topic", propertyListedByOwner);
handleTopicRequest("get_user_details_topic", getUserDetails);
handleTopicRequest("book_property_topic", bookProperty);
handleTopicRequest("traveler_bookings_topic",travelerBookings);
handleTopicRequest("filter_property_topic", searchWithFilters);
handleTopicRequest("send_message_to_owner_topic", sendMessage);
handleTopicRequest("get_message_topic", getMessage);
