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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CreateRoom from "@/components/Rooms/CreateRoom";

const URL = "http://localhost:5000";

function Home() {
  const [username, setUserName] = useState("");
  const [openDialogue, setOpenDialogue] = useState(false);
  const [error, setError] = useState(false);
  const [socketId, setSocketId] = useState<string>();

  const isCreateRoomDialogue = useSelector(
    (state: RootState) => state.roomCreateProp.isCreateRoomDialogOpen
  );

  const handleSubmit = () => {
    if (username!.trim() === "") {
      setError(true);
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ username: username, id: socketId, active: false })
    );

    setOpenDialogue(false);
  };

  useEffect(() => {
    const checkLocalStorage = localStorage.getItem("user");

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

      const userData = localStorage.getItem("user");
      const data = JSON.parse(userData!);

      setUserName(data.username);
      setSocketId(data.id);
    }
  }, []);

  return (
    <div>
      {openDialogue && (
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
      )}

      {isCreateRoomDialogue && <CreateRoom />}
    </div>
  );
}
export default Home;
