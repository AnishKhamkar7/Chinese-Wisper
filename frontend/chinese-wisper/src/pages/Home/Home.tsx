import { io } from "socket.io-client";
import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const URL = "http://localhost:5000";

function Home() {
  const [username, setUserName] = useState("");
  const [openDialogue, setOpenDialogue] = useState(true);
  const [error, setError] = useState(false);
  const [socketId, setSocketId] = useState<any>();

  const handleSubmit = () => {
    if (username!.trim() === "") {
      setError(true);
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("id", socketId);
    setOpenDialogue(false);
  };

  useEffect(() => {
    const checkLocalStorage = localStorage.getItem("username");

    if (!checkLocalStorage) {
      setOpenDialogue(true);
      const socket = io(URL, {});
      socket.on("socketId", (data) => {
        const id = data;
        console.log("Socket Connected");
        setSocketId(id);
      });

      return () => {
        socket.disconnect();
      };
    } else {
      setOpenDialogue(false);

      const userName = localStorage.getItem("username");
      const userId = localStorage.getItem("id");

      setUserName(userName!);
      setSocketId(userId);
    }
  }, []);

  return (
    <div>
      {openDialogue ? (
        <Dialog open={openDialogue}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Name</DialogTitle>
              <DialogDescription>
                Enter your name or generate your name
                {error && (
                  <Alert variant="destructive" className="border-none">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Username should not be empty
                    </AlertDescription>
                  </Alert>
                )}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  UserName
                </Label>
                <Input
                  id="name"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="col-span-3 outline-black"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSubmit}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <h1>Hi {username}</h1>
      )}
    </div>
  );
}

export default Home;
