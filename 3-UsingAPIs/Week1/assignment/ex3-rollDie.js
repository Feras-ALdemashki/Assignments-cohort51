/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/3-UsingAPIs/Week1#exercise-3-roll-a-die

- Run the unmodified program and confirm that problem described occurs.
- Refactor the `rollDie()` function from callback-based to returning a
  promise.
- Change the calls to `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that call `rollDie()` to use the promise it returns.
- Does the problem described above still occur? If not, what would be your
  explanation? Add your answer as a comment to be bottom of the file.
------------------------------------------------------------------------------*/

export function rollDie() {
  return new Promise((resolve, reject) => {
    const randomRollsToDo = Math.floor(Math.random() * 8) + 3;
    console.log(`Die scheduled for ${randomRollsToDo} rolls...`);

    const rollOnce = (roll) => {
      const value = Math.floor(Math.random() * 6) + 1;
      console.log(`Die value is now: ${value}`);
      if (roll > 6) {
        reject(new Error('Oops... Die rolled off the table.'));
      }

      if (roll < randomRollsToDo) {
        setTimeout(() => rollOnce(roll + 1), 500);
      } else {
        resolve(value);
      }
    };

    rollOnce(1);
  });
}

function main() {
  rollDie()
    .then((value) => console.log(`Die value is now: ${value}`))
    .catch((data) => {
      data;
    });
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}

// the previous problem is no longer exist.
// now we return the promise so the rolling will stop after the promise is resolved or rejected
