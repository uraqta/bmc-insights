'use client'
import { UploadButton } from "@/utils/uploadthing"; // Adjust the path as needed
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";

interface Submission {
  title: string;
  text: string;
  imageUrl: string;
}

const ImageUpload = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  useEffect(() => {
    const savedSubmissions = localStorage.getItem("submissions");
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("submissions", JSON.stringify(submissions));
  }, [submissions]);

  const handleUploadComplete = (res: { url: string }[]) => {
    if (res[0]?.url) {
      setImageUrl(res[0].url);
      setUploadComplete(true);
      alert("Upload Completed");
    }
  };

  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error);
    alert(`ERROR: ${error.message}`);
    setUploadComplete(false);
  };

  const handleSubmit = async () => {
    if (!title || !text) {
      alert("Please enter a title and body text.");
      return;
    }

    if (imageUrl && !uploadComplete) {
      alert("Please wait for the image upload to complete.");
      return;
    }

    const newSubmission: Submission = { title, text, imageUrl };

    try {
      const response = await axios.post("/api/dashboard", newSubmission);
      console.log("Response:", response.data);
      setSubmissions([...submissions, newSubmission]);

      setTitle("");
      setText("");
      setImageUrl("");
      setUploadComplete(false);
      alert("Submission added successfully!");
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
        alert(`Error submitting the data: ${error.response?.data?.error || error.message}`);
      } else {
        console.error("Unknown error:", error);
        alert("There was an error submitting the data. Please try again.");
      }
    }
  };

  return (
    <div>
      {/* Header moved outside of the section */}
      <div className="text-center md:text-4xl text-3xl font-bold mt-12 md:mt-20 my-12">
        <h1 className="font-montserrat text-primary">UPLOAD NEWS</h1>
      </div>

      {/* Main section with dark background */}
      <section className="container mx-auto py-2 sm:my-12 bg-[#010b13] text-white px-4 sm:px-8 rounded-lg">
        <div className="my-12">
          <div className="overflow-hidden relative grid w-full h-96 bg-foreground rounded-xl mb-24 place-items-center bg-opacity-25">
            <img
              src={imageUrl}
              alt="Uploaded file preview"
              className="w-full h-[25rem] object-cover absolute border-gray-500"
            />

            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={handleUploadComplete}
              onUploadError={handleUploadError}
              className="text-2xl opacity-80 text-white"
            />
          </div>

          <form>
            <div className="grid gap-12">
              <div className="flex flex-col">
                <Label className="text-lg font-semibold">News Title:</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter News Title"
                  className="!bg-transparent border-2 rounded-md p-4 my-4 text-white font-semibold text-lg !border-gray-600" 
                />
              </div>

              <div className="flex flex-col">
                <Label className="text-lg font-semibold">News Body:</Label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter News Body"
                  rows={8}
                  className="bg-inherit border-2 rounded-md p-4 my-4 resize-none text-lg text-white font-medium border-gray-600"
                />
              </div>
            </div>

            <div className="container mx-auto my-12">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                disabled={!!(imageUrl && !uploadComplete)}
                className="w-full py-4 bg-secondary hover:bg-opacity-80 hover:bg-secondary text-lg font-semibold text-black"
              >
                Upload
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ImageUpload;
