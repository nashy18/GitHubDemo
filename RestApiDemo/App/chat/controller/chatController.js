'use strict';
angularMvcTest.controller('chatcontroller', ['$scope', '$http', '$window', '$rootScope', '$mdDialog', '$timeout', '$filter', '$mdMedia', function ($scope, $http, $window, $rootScope, $mdDialog, $timeout, $filter, $mdMedia) {
    $rootScope.URL = 'chat';

    //Code Starts Here-
    var count;
    var pvtchatid = [];
    $(function () {
        setScreen(false);

        // Declare a proxy to reference the hub.
        var chatHub = $.connection.signalRHub;

        registerClientMethods(chatHub);

        // Start Hub
        $.connection.hub.start().done(function () {

            registerEvents(chatHub);
            //If user has not sign out then login directly
            if (localStorage.name != undefined || localStorage.name != null) {
                chatHub.server.connect(localStorage.name);
            }

        });
    });

    function setScreen(isLogin) {

        if (!isLogin) {

            $("#divChat").hide();
            $("#divLogin").show();
        }
        else {

            $("#divChat").show();
            $("#divLogin").hide();
        }

    }

    function registerEvents(chatHub) {

        $("#btnStartChat").click(function () {

            var name = $("#txtNickName").val();
            if (name.length > 0) {
                chatHub.server.connect(name);
                localStorage.setItem("name", name);
            }
            else {
                alert("Please enter name");
            }

        });

        //On Sign Out
        $("#signoutbutton").click(function () {
            alert("Sign Out Success !")
            chatHub.server.disConnect();
            $("#divusers").empty();
            $("#divChatWindow").empty();
            $("#divChat").hide();
            $("#divLogin").show();
            var i = 0;
            for (i = 0; i < pvtchatid.length; i++) {
                $('#' + pvtchatid[i]).remove();
            }
            localStorage.removeItem("name");
        });

        $('#btnSendMsg').click(function () {

            var msg = $("#txtMessage").val();
            if (msg.length > 0) {

                var userName = $('#hdUserName').val();
                chatHub.server.sendMessageToAll(userName, msg);
                $("#txtMessage").val('');
            }
        });


        $("#txtNickName").keypress(function (e) {
            if (e.which == 13) {
                $("#btnStartChat").click();
            }
        });

        $("#txtMessage").keypress(function (e) {
            if (e.which == 13) {
                $('#btnSendMsg').click();
            }
        });
    }
    function registerClientMethods(chatHub) {

        // Calls when user successfully logged in
        chatHub.client.onConnected = function (id, userName, allUsers, messages) {
            setScreen(true);
            $("#divusers").empty();
            $('#hdId').val(id);
            $('#hdUserName').val(userName);
            $('#spanUser').html(userName);
            var i = 0;
            // Add All Users
            for (i = 0; i < allUsers.length; i++) {
                AddUser(chatHub, allUsers[i].ConnectionId, allUsers[i].UserName);
            }
            // Add Existing Messages
            for (i = 0; i < messages.length; i++) {

                AddMessage(messages[i].UserName, messages[i].Message);
            }
            count = (allUsers.length) - 1;
            $('#userDetails').html(count);
        }

        // On New User Connected
        chatHub.client.onNewUserConnected = function (id, name) {
            AddUser(chatHub, id, name);
        }
        // On User Disconnected
        chatHub.client.onUserDisconnected = function (id, userName) {
            $('#' + id).remove();
            var ctrId = 'private_' + id;
            $('#' + ctrId).remove();
            var disc = $('<div class="disconnect">"' + userName + '" logged off !</div>');
            $(disc).hide();
            $('#divusers').prepend(disc);
            $(disc).fadeIn(200).delay(2000).fadeOut(200);
            count--;
            $("#userDetails").html(count);
        }


        chatHub.client.messageReceived = function (userName, message) {

            AddMessage(userName, message);
        }


        chatHub.client.sendPrivateMessage = function (windowId, fromUserName, message) {

            var ctrId = 'private_' + windowId;


            if ($('#' + ctrId).length == 0) {

                createPrivateChatWindow(chatHub, windowId, ctrId, fromUserName);

            }

            $('#' + ctrId).find('#divMessage').append('<div class="message"><span class="userName">' + fromUserName + '</span>: ' + message + '</div>');

            // set scrollbar
            var height = $('#' + ctrId).find('#divMessage')[0].scrollHeight;
            $('#' + ctrId).find('#divMessage').scrollTop(height);

        }

    }

    function AddUser(chatHub, id, name) {

        var userId = $('#hdId').val();

        var code = "";

        if (userId == id) {

            code = $('<div class="loginUser  blue">' + '<span class="fa fa-user text-black"></span>&nbsp;<span class="text-black">' + name + "</span></div>");

        }
        else {

            code = $('<a id="' + id + '" class="user green" ><i class="fa fa-user text-black"></i>&nbsp;<span class="text-black">' + name + '</span><a>');

            $(code).dblclick(function () {

                var id = $(this).attr('id');

                if (userId != id)
                    OpenPrivateChatWindow(chatHub, id, name);

            });
        }

        $("#divusers").append(code);
        count++;
        $("#userDetails").html(count);

    }

    function AddMessage(userName, message) {
        $('#divChatWindow').append('<div class="message text-black orange accent-1"><span class="userName">' + '<span class="fa fa-user"></span>&nbsp;' + userName + '</span>: ' + message + '</div>');

        var height = $('#divChatWindow')[0].scrollHeight;
        $('#divChatWindow').scrollTop(height);
    }

    function OpenPrivateChatWindow(chatHub, id, userName) {

        var ctrId = 'private_' + id;

        if ($('#' + ctrId).length > 0) return;

        createPrivateChatWindow(chatHub, id, ctrId, userName);

    }

    function createPrivateChatWindow(chatHub, userId, ctrId, userName) {

        var div = '<div id="' + ctrId + '" class="ui-widget-content draggable" rel="0">' +
                  '<div class="title teal lighten-2">' +
                     '<div  style="float:right;">' +
                         '<span id="imgDelete"  style="cursor:pointer;" class="fa fa-times"></span>' +
                      '</div>' +

                      '<span class="selText" rel="0">' + '<span class="fa fa-user"></span>&nbsp;' + userName + '</span>' +
                  '</div>' +
                  '<div id="divMessage" class="messageArea">' +

                  '</div>' +
                  '<div class="buttonBar">' +
                     '<div class="col l8"><input id="txtPrivateMessage" class="msgText" type="text"  class="text-white" /></div>' +
                     '<div class="col l4"><input id="btnSendMessage" class="btn btn-success btn-sm pull-right m-b-sm" type="button" value="Send"   /></div>' +
                  '</div>' +
               '</div>';
        pvtchatid.push(ctrId);
        var $div = $(div);

        // DELETE BUTTON IMAGE
        $div.find('#imgDelete').click(function () {
            $('#' + ctrId).remove();
        });

        // Send Button event
        $div.find("#btnSendMessage").click(function () {

            //$textBox = $div.find("#txtPrivateMessage");
            //var msg = $textBox.val();
            var msg = $("#txtPrivateMessage").val();
            if (msg.length > 0) {

                chatHub.server.sendPrivateMessage(userId, msg);
                //$textBox.val('');
                $("#txtPrivateMessage").val('');
            }
        });

        // Text Box event
        $div.find("#txtPrivateMessage").keypress(function (e) {
            if (e.which == 13) {
                $div.find("#btnSendMessage").click();
            }
        });

        AddDivToContainer($div);

    }

    function AddDivToContainer($div) {
        $('#divContainer').prepend($div);

        $div.draggable({

            handle: ".header",
            stop: function () {

            }
        });

        ////$div.resizable({
        ////    stop: function () {

        ////    }
        ////});

    }
    //Code Ends Here-
}]);