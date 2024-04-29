const { Web3 } = require('web3');
const readline = require('readline');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
const { stdin: input, stdout: output } = require('node:process');
const crypto = require('crypto');

const rl = readline.createInterface({ input, output });
var password = "miku";
var userAccount = '';
var userBalance;
var password;
var userID;
var noOfAccountsToBeCreated;
var userName;

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
                this.createNewUserGUI();
            } else if (confirmation == "n" || confirmation == "N") {
                this.showFirstPage();
            }

        })
    }
    createNewUserGUI() {
        rl.question("\n    Full Name: ", (userName) => {
            if (!userName) {
                console.log("    Please type a name");
                this.createNewUserGUI();
            } else {
                rl.question("    No.of accounts should be created in wallet (can be 0): ", (noOfAccounts) => {
                    if (!noOfAccounts) {
                        console.log("    Please enter the number of accounts to be created");
                    } else if (noOfAccounts) {
                        this.createUser(userName, noOfAccounts);
                    }
                })
            }})
    }
    createUser(userName, noOfAccounts) {
        userID = crypto.createHash('sha256').update(userName).digest('hex');
        const walletDetails = web3.eth.accounts.wallet.create(noOfAccounts);
        


    }
}
var firstPageShow = new FirstPage();
firstPageShow.showFirstPage(); 