/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-5-using-the-vscode-debugger

Use the VSCode Debugger to fix the bugs
--------------------------------------------------------------- --------------*/
async function getData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`something wen wrong: ${response.status}`);
  }
  return response.json();
}

function renderLaureate({ knownName, birth, death }) {
  console.log(`\nName: ${knownName?.en || 'Unknown'}`);

  const birthDate = birth?.date || 'Unknown';
  const birthPlace = birth?.place?.locationString?.en || 'Unknown';
  console.log(`Birth: ${birthDate}, ${birthPlace}`);

  const deathDate = death?.date || 'unknown';
  const deathPlace = death?.place?.locationString?.en || 'unknown';
  console.log(`Death: ${deathDate}, ${deathPlace}`);
}
function renderLaureates(laureates) {
  laureates.forEach(renderLaureate);
}

async function fetchAndRender() {
  try {
    const data = await getData(
      'http://api.nobelprize.org/2.0/laureates?birthCountry=Netherlands&format=json&csvLang=en'
    );
    renderLaureates(data.laureates);
  } catch (err) {
    console.error(err);
  }
}

fetchAndRender();
