const { Web3 } = require('web3');
const readline = require('readline');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
const { stdin: input, stdout: output } = require('node:process');
const crypto = require('crypto');
const fs = require('fs');

const rl = readline.createInterface({ input, output });
var password = "miku";
var userAccount = '';
var userBalance;
var password;
var noOfAccountsToBeCreated;

console.log("[+] Etherium Miku Wallet");

class FirstPage {

    showFirstPage() {
        rl.question("    Enter Wallet Password  \n    Type C to create new wallet: ", (firstpageanswer) => {
            if (!firstpageanswer) {
                console.log('    Please Write Something');
                rl.close();
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
                this.showFirstPage
            }

        })
    }

}
class NewUser{
    createNewUserGUI() {
        rl.question("    No.of accounts should be created in wallet (can be 0): ", (noOfAccounts) => {
            if (!noOfAccounts) {
                console.log("    Please enter the number of accounts to be created");
            } else if (noOfAccounts) {
                this.createUser(noOfAccounts);
            }
        })
    }
    createUser(noOfAccounts) {
        crypto.randomBytes(32, (err, buffer)=>{
            if (err){
                console.log(err);
                return;
            }

        const userID = buffer.toString('hex');
        const walletDetails = web3.eth.accounts.wallet.create(noOfAccounts);
        fs.writeFile('userID.txt', userID , (error) => {
            if (error) {
                console.log(error);
            }
        })
        return;
        })
    }
}


var firstPageShow = new FirstPage();
var newUser = new NewUser();
firstPageShow.showFirstPage(); 