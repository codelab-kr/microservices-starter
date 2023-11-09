// eslint-disable-next-line @typescript-eslint/no-unused-vars
function login() {
  const form = document.getElementById('loginForm');
  const formData = new FormData(form);

  fetch('login', {
    body: formData,
    method: 'POST',
  })
    .then(() => {
      //
      // Display that the upload has completed.
      //
      const resultsElement = document.getElementById('results');
      if (!resultsElement) {
        throw new Error('Could not find results element.');
      }
      resultsElement.innerHTML += `<div>${file.name}</div>`;

      //
      // Clear the file form the upload input.
      //
      const uploadInput = document.getElementById('uploadInput');
      // uploadInput.value = null;
      if (!uploadInput) {
        throw new Error('Could not find results element.');
      }
      uploadInput.innerHTML = '';
    })
    .catch((err) => {
      console.error(`Failed to upload: ${file.name}`);
      console.error(err);

      const resultsElement = document.getElementById('regisults');
      if (!resultsElement) {
        throw new Error('Could not find results element.');
      }
      resultsElement.innerHTML += `<div>Failed ${file.name}</div>`;
    });
}

//
// Upload a collection of files to the backend.
//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function uploadFiles(files) {
  Array.from(files).forEach(uploadFile);
}
