console.log($)

$(".btn").click(function(e) {

  console.log("hi!");
  var commaSeparatedUsers = $(".input").val();
  var users = getUsers(commaSeparatedUsers);
})


function getUsers(commaSeparatedUsers) {
  // TODO(add handling for spaces)
  var usernames = commaSeparatedUsers.split(",")
  var users = []
  var promises = []

  _.each(usernames, function(username) {
    var request = $.get("https://api.github.com/users/" + username, function(response) {
      users.push([username, response.public_repos])
    })

    promises.push(request.promise())
  })

  $.when.apply($, promises).done(function () {
    var results = [].slice.call(arguments);
    var sortedUsers = _.sortBy(users, function(user) {
      return user[1] - user[1] - user[1];
    })

    printUsers(sortedUsers)
  });
}

function printUsers(sortedUsers) {
  $body = $("tbody")
  $body.text("");
  _.each(sortedUsers, function(user) {
    var $tr = $("<tr>");
    $tr.append($("<th>").text(user[0]))
    $tr.append($("<th>").text(user[1]))
    $body.append($tr);
  })
}
