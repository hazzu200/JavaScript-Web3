const {Web3} = require('web3');
const readline  = require('readline');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });
var password = "miku";
var userAccount = '';
var userBalance;
var password
console.log("[+] Etherium Miku Wallet");

class FirstPage{
    
    showFirstPage(){
        rl.question("    Enter Wallet Password  \n    Type C to create new wallet: ", (firstpageanswer) =>{
            if (!firstpageanswer) {
                console.log('    Please Write Something');
                rl.close();
            }   
            if (firstpageanswer == "C" || firstpageanswer == "c") {
               this.showCreateWallet();
            }
        })
    }
    showCreateWallet(){
        rl.question("    NOTE: All your accounts will be removed in the current wallet [Y][N]: ", (confirmation)=>{
            if (confirmation == "Y" || confirmation == "y") {
                const walletInfo = web3.eth.accounts.wallet.create();
                console.log(walletInfo);
            }else if (confirmation == "n" || confirmation == "N"){
                this.showFirstPage();
            }
            
        })
    }
}
var firstPageShow = new FirstPage();
firstPageShow.showFirstPage(); 