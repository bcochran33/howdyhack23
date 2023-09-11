let button = document.getElementById("button")

button.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({
        active:true, 
        currentWindow: true
    })

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: scrapeEmailsFromPage
    })
})

function scrapeEmailsFromPage() {
    // Select all elements with the specified class
    const elements = document.querySelectorAll('.ergWt_bGBk');

    // Create an array to store the text content of selected elements
    const elementTexts = [];

    // Iterate through the selected elements and store their text content
    elements.forEach(element => {
    // Get the text content of the element and add it to the array
    elementTexts.push(element.textContent.trim());
    });

    // Regular expression to match the specified format
    const regex = /Assignment .+?, due .+?./;

    // Function to extract messages matching the format
    function extractMatchingMessages(messages) {
    const matchingMessages = messages.filter(message => regex.test(message));
    return matchingMessages;
    }

    // Call the function to extract matching messages
    const matchingMessages = extractMatchingMessages(elementTexts);
    alert(matchingMessages);
}

