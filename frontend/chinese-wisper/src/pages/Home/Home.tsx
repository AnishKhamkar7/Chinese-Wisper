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
import { v4 as uuidv4 } from "uuid";
import { Socket } from "dgram";

const URL = "http://localhost:5000";

interface User {
  id: string;
  username: string;
}

function Home() {
  const [user, setUser] = useState<User>({
    id: uuidv4(),
    username: "",
  });
  const [openDialogue, setOpenDialogue] = useState(true);
  const [error, setError] = useState(false);
  const [socket, setSocket] = useState<any>();

  const handleSubmit = () => {
    if (user?.username.trim() === "") {
      setError(true);
      return;
    }

    localStorage.setItem("username", user.username);
    localStorage.setItem("id", user.id);
    setOpenDialogue(false);
  };

  useEffect(() => {
    const checkLocalStorage = localStorage.getItem("username");

    if (!checkLocalStorage) {
      console.log("going if");
      setOpenDialogue(true);
      const socket = io(URL, {});
      socket.on("connect", () => {
        console.log("Socket Connected");
        setSocket(socket.id);
      });

      return () => {
        socket.disconnect();
      };
    } else {
      setOpenDialogue(false);
      console.log("going else");

      const userObjName = localStorage.getItem("username");
      const userObjId = localStorage.getItem("id");

      setUser({ id: userObjId!, username: userObjName! });
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
                  value={user?.username}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, username: e.target.value }))
                  }
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
        <h1>Hi {user?.username}</h1>
      )}
    </div>
  );
}

export default Home;
