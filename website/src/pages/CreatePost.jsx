import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  //to navigate to a specific route
  const navigate = useNavigate();

  //form state to keep track of the current state
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  //state to load the generating animation in the button and the image container
  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  //func to keep changing the state in the input fields
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  //func to get random values from the constants and set to the form prompt value
  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  //func to generte image using the prompt value and fetch it from the server
  const generateImage = async () => {
    //checking if the prompt value isn't empty
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        //getting the response from the server
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        //stroing the response from the server and setting it to the form data
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  //func to handle the submissions and post the image to the community
  const handleSubmit = async (e) => {
    //preventing the default reload for the webpage
    e.preventDefault();

    //checking if we have prompt value and a image
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        //getting the response from the server
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="max-w-7xl mx-auto mt-[100px]">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">Generate an imaginative image through DALL-E AI and share it with the community</p>
      </div>

      {/* name form field */}
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex., Adnan"
            value={form.name}
            handleChange={handleChange}
          />

          {/* prompt form field */}
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="An Impressionist oil painting of sunflowers in a purple vase…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          {/* dynamic divs for displaying the current state of the images */}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              // generated image
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              //preview image before uploading an prompt
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}
            {/* loading animation */}
            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
  
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-green-700 font-medium font-pacifico rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">** Once you have created the image you want, you can share it with others in the community **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the Community'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;