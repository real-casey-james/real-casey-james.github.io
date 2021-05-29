
$.getJSON('./data', data => {
  console.log(data); //["doc1.jpg", "doc2.jpg", "doc3.jpg"] 
});


// // const fs = require('fs')
// // const readline = require('readline')

// // const rl = readline.createInterface({
// //   input: process.stdin,
// //   output: process.stdout
// // })

// function fetcher() {
//   var generateButtons = ""
//   fs.readdir("./data", function(files) {
//     for (let i = 0; i < files.length; i++) {
//       generateButtons += "<button>" + files[i] + "</button>"
//     }
//   })
//   document.getElementById("buttonContainer").innerHTML = generateButtons
// }

// function mainMenu () {
//   console.log('Morena')
//   console.log('------')
//   console.log('Select artwork, or another function')
//   console.log('"c" to comment')
//   console.log('"v" to view comments')
//   console.log('"e" to erase comments')
//   console.log('"q" to quit \n')
  
//   fs.readdir("./data", function(err, files) {
//     for (let i = 0; i < files.length; i++) {
//       print((i + 1 +  ': ') + files[i])
//     }
  
//   rl.question('Make your selection: \n', function (input) {
    
// if (input >= 1 && input <= 5) {
//     fs.readFile(__dirname + '/data/' + files[input], 'utf8',(err,data) => {
//       print(data)
//     })
//   } else if (input == 'q') {
//     process.exit()
//   } else if (input == 'c') {
//     comment()
//   } else if (input == 'v') {
//     readComment()
//   } else if (input == 'e') {
//     erase()
//   }
//   })
// })
// }

// function comment () {
//   rl.question('What do you wanna say?', (answer) => {
//     rl.close()
    
//     fs.writeFile('comment.txt', answer, (err) => {
     
//       if (err)
//         console.log(err);
//       else {
//         console.log("File written successfully\n");
//         console.log("The written has the following contents:");
//         console.log(fs.readFileSync("comment.txt", "utf8"));
//     }
//   })
// })
// }


// function readComment() {
//   rl.close()
//   console.log(fs.readFileSync("comment.txt", "utf8"));
// }

// function erase() {
//   rl.close()
//   fs.writeFile('comment.txt', "", function(){console.log('done')})
// }

// // mainMenu()


// // function print (stuff) {
// //   console.log(stuff)
// // }

// //TODO - fs.appendFile

// module.exports = {
// //TODO
// }