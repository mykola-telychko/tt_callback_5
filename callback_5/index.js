// Function to perform an asynchronous operation with a timeout
function performAsyncOperationWithTimeout(timeout, operation, callback) {
    let isOperationCompleted = false;

    // Set a timeout to handle the case when the operation takes too long
    const timer = setTimeout(() => {
        if (!isOperationCompleted) {
            isOperationCompleted = true;
            callback(new Error("Timeout exceeded"), null); // Call the callback with a timeout error
        }
    }, timeout);

    // Perform the asynchronous operation
    operation((error, result) => {
      
        // console.log(result);

        if (!isOperationCompleted) {
          
            isOperationCompleted = true;
            clearTimeout(timer); // Clear the timeout since the operation completed

            if (error) {
                      console.log('error');

                callback(error, false); // Call the callback with an error
            } else {
                      console.log('result');

                callback(false, result); // Call the callback with the result
            }
        }
    });
}

// Example usage
function simulateAsyncOperation(callback) {
    // Simulate an asynchronous operation with setTimeout
    setTimeout(() => {
        const result = "Operation Result";
        callback(false, result);
    }, 2000); // Simulated delay of 2 seconds
}

function handleOperationResult(error, result) {
      console.log('main callback', error.message);

    if (error) {
        console.error("Error:", error.message);
    } else {
        console.log("Result:", result);
    }
}

// Usage of the function with a 1-second timeout
performAsyncOperationWithTimeout(1000, simulateAsyncOperation, handleOperationResult);
