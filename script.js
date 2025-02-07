// script.js
async function checkWallet() {
    const address = document.getElementById('addressInput').value;
    if (!address) return;

    try {
        // Fetch balance
        const balanceResponse = await fetch(`https://internal.suivision.xyz/testnet/api/account/coins?account=${address}`);
        const balanceData = await balanceResponse.json();

        // Fetch NFTs/Blobs
        const nftResponse = await fetch(`https://internal.suivision.xyz/testnet/api/account/nfts?account=${address}&pageSize=5&pageIndex=1&returnCollection=true&isUnknown=true`);
        const nftData = await nftResponse.json();

        displayResults(balanceData.result, nftData.result);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayResults(balanceResult, nftResult) {
    document.getElementById('results').classList.remove('hidden');
    
    // Display tokens
    const tokenList = document.getElementById('tokenList');
    tokenList.innerHTML = balanceResult.coins.map(coin => `
        <div class="token-item">
            <span>${coin.symbol}</span>
            <span>${(coin.balance / 1e9).toFixed(4)}</span>
        </div>
    `).join('');

    // Display object stats
    const objectStats = document.getElementById('objectStats');
    const totalObjects = nftResult.total || 0;
    objectStats.innerHTML = `
        <div class="token-item">
            <span>Total Objects</span>
            <span>${totalObjects}</span>
        </div>
    `;
}