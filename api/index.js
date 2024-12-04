<input type="file" id="fileInput">
<button id="uploadButton">Upload</button>

<script>
  const fileInput = document.getElementById('fileInput');
  const uploadButton = document.getElementById('uploadButton');

  uploadButton.addEventListener('click', () => {
    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })
    .then(response => response.json())
    .then(data => {
      console.log('File uploaded successfully:', data);
      alert('File uploaded! URL: ' + data.url);
    })
    .catch(error => {
      console.error('Error uploading file:', error);
    });
  });
</script>
