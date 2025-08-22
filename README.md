# Facebook-Messenger-massage-unsender-removal
Removes massages on facebook messanger [https://www.messenger.com/]

works as of 8/22/2025 (25.8.2025)

original project (you might want to read the the comments under the code first):
[https://gist.github.com/innateessence/43706a983b0f6cbf3b16058ada373baa]

future changes might break it again
!!!make sure that if you press unsent/remove massage for yourself the default option is "unsent for everyone" it dose not check or change it. if the UI changes it might just remove the massages for you (other parson will still see it) (if you run it you should be able to see the unsent massage before it gets removed (if not it might not work properly) text "You unsent the massage")!!!
!some massages will state "Error displayin this massage" they were failed to unsent if you refresh the page they should load properly and if you rerun should delete those as well! (those massages should not cause any other problems)

HOW TO RUN:
open massanger.com (if not alredy in english set the UI language to english) (should not work if its in any other language)
right click, inspect, console (facebook has massage in console that says its unsafe to run unknow code), copy paste the entire contents of the js file into the console, hit enter.
(this code should be safe as far as i know but checking unknown code for safety is still good practice)
HOW TO STOP:
just reload the page (Ctrl + R)

i just fixed a few lines of code so its up to date with new UI changes
(i dont mind what you do with it BUT im NOT the original author)
(if the autor has any issues with this repositary please contact me)
(i likely won't maintain the project long term but if you submit changes i dont have issues with it)

OTHER PROJECTS OF THIS KIND (not my):
messenger:
  shoot-the-messenger 
  didnt work for me as of 8/22/2025 (25.8.2025) but it might be fixed later on)(try it if this project doesnt work anymore)
  (if its taked down from chrome web store/or you want latest version you should still be able to use it by switching to developer mode in the extension tab, and addint the project manualy (downloading github files and loading them into chrome))
  [https://github.com/theahura/shoot-the-messenger]

instagram:
  the setup was bit more complicated and it didnt work for me in chrome (the chrome web store took down Violentmonkey (required dependency))
  i managed to make it work in firefox (recommend) (just follow the guide in in README)
  [https://github.com/thoughtsunificator/instagram-dm-unsender/blob/master/README.md]
