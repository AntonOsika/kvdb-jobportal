import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.jsx";
import "./App.css";

const KVDB_BUCKET = "BLbtbuWvN1B5uCxdV8Nzk6";
const KVDB_KEY = "supersecret:";
const KVDB_URL = `https://kvdb.io/${KVDB_BUCKET}/`;

function App() {
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    const res = await fetch(`${KVDB_URL}?values=true&format=json&prefix=jobs:`, {
      headers: { Authorization: `Basic ${btoa(`${KVDB_KEY}`)}` },
    });
    const data = await res.json();

    const jobsData = Object.values(data)
      .filter((job) => job.key.startsWith("jobs_"))
      .map((job) => job.value);

    console.log("Fetched jobs:", jobsData);

    setJobs(jobsData);
  }

  async function handleSubmit() {
    const job = { title, description, url };
    await fetch(`${KVDB_URL}jobs_`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${KVDB_KEY}`)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    setOpen(false);
    setTitle("");
    setDescription("");
    setUrl("");
    fetchJobs();
  }

  async function handleDelete(key) {
    await fetch(`${KVDB_URL}${KVDB_KEY}${key}`, {
      method: "DELETE",
      headers: { Authorization: `Basic ${btoa(`${KVDB_KEY}`)}` },
    });
    fetchJobs();
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Jobs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-end">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>Add Job</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Job</DialogTitle>
                  <DialogDescription>Enter the details for the new AI job listing.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center space-x-4">
                    <img src={`https://source.unsplash.com/random/?portrait%20professional`} alt="Job" className="h-14 w-14 rounded-full" />
                    <div className="space-y-1">
                      <Input placeholder="Job Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                      <Input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
                    </div>
                  </div>
                  <Textarea placeholder="Description" className="col-span-3" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <DialogFooter>
                  <Button onClick={handleSubmit}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableCaption>AI job listings</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job, index) => (
                <TableRow key={index}>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.description}</TableCell>
                  <TableCell>
                    <a href={job.url} target="_blank">
                      {job.url}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleDelete(job.key)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
