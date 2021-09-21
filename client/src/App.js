import { useState } from "react";
import axios from "axios";
import "./App.css";

async function postImage({ image, description }) {
  const formData = new FormData();
  for (const keys in image) {
    formData.append("image", image[keys]);
  }
  formData.append("description", description);
  const result = await axios.post(
    "http://localhost:5000/api/images",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return result.data;
}

function App() {
  const [file, setFile] = useState();
  // const [previewImage, setPreviewImage] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: file, description });
    console.log(result);
    setImages([result.image, ...images]);
  };

  const fileSelected = (event) => {
    const files = event.target.files;
    setFile([...files]);
  };

  return (
    <div className="App">
      <form onSubmit={submit}>
        <input
          onChange={fileSelected}
          type="file"
          accept="image/*"
          name="image"
          multiple
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
        ></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
