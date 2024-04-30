const { Web3 } = require('web3');
const readline = require('readline');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
const { stdin: input, stdout: output } = require('node:process');
const crypto = require('crypto');
const fs = require('fs');

const rl = readline.createInterface({ input, output });
var userAccount = '';
class FirstPage {

    showFirstPage() {
        console.clear()
        console.log("[+] Etherium Miku Wallet");
        rl.question("    Enter Wallet Password  \n    Type C to create new wallet: ", (firstpageanswer) => {
            if (!firstpageanswer) {
                firstPageShow.showFirstPage();

            }
            if (firstpageanswer == "C" || firstpageanswer == "c") {
                this.showCreateWallet();
            }
        })
    }
    showCreateWallet() {
        rl.question("    NOTE: All your accounts will be removed in the current wallet [Y][N]: ", (confirmation) => {
            if (confirmation == "Y" || confirmation == "y") {
                newUser.createNewUserGUI();
            } else if (confirmation == "n" || confirmation == "N") {
                this.showFirstPage()
            }

        })
    }

}
class NewUser {
    createNewUserGUI() {
        rl.question("    No.of accounts should be created in wallet (can be 0): ", (noOfAccounts) => {
            if (!noOfAccounts) {
                this.createNewUserGUI();
            } else if (noOfAccounts) {
                this.createUser(noOfAccounts);
            }
        })
    }

    createUserIDFile(user) {
        fs.writeFile('userID.txt', user, (error) => {
            if (error) {
                console.log(error);
            }
        })
    }
    savingAccounts(data) {

        for (let index = 0; index <= (data.length) - 1; index++) {

            var dataToWrite = " " + data[index]['privateKey']
            fs.writeFile('accounts.txt', '', () => { })
            fs.appendFile('accounts.txt', dataToWrite, (err) => {
                if (err) {
                    console.log(err);

                }
            })

        }
        dataToWrite == null
    }
    createUser(noOfAccounts) {
        crypto.randomBytes(32, (err, buffer) => {
            if (err) {
                console.log(err);
            }
            const walletDetails = web3.eth.accounts.wallet.create(noOfAccounts);
            userAccount = buffer.toString('hex');

            this.createUserIDFile(userAccount);
            if (noOfAccounts == 0) {
                fs.writeFile('accounts.txt', "", () => { })
            } else {
                this.savingAccounts(walletDetails);
            }

            mainMenu.mainMenuGUI();
        })


    }
}
class MainMenu {
    mainMenuGUI() {
        console.clear();
        console.log(`[+] Welcome user: ${userAccount} `);
        console.log("\n [+] KeyBinds: C(Create new account)  S(Etherium Transaction)  L(Look Up Transaction) \n  A(Check Account Related Details) <(To LogOut) </(To Close program) ")
        rl.question('\n  Key: ', (key)=>{
            this.keyBindChecker(key)
        })
    
    }
    keyBindChecker(keyPressed){
        if (keyPressed == "<") {
            this.logOut();
        }
        if (keyPressed == "</"){
            this.closeProgram()
        }
    }
    createNewAccount(){

    }
    etheriumTransaction(){

    }
    lookUpTransaction(){

    }
    checkAccountDetails(){

    }
    logOut(){
    firstPageShow.showFirstPage();

    }
    closeProgram(){
        console.clear()
        rl.close();
    }
}

var firstPageShow = new FirstPage();
var newUser = new NewUser();
var mainMenu = new MainMenu();
firstPageShow.showFirstPage(); 