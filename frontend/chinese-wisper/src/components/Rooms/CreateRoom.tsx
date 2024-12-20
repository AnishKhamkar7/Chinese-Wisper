import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Alert, AlertTitle } from "../ui/alert";
import { AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { closeCreateRoomDialog } from "@/store/roomCreatePropSlicer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { roomData } from "@/store/roomCreatePropSlicer";
import { activeUser } from "@/store/socketSlicer";
import { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useNavigate } from "@tanstack/react-router";

function CreateRoom({
  socket,
  userId,
}: {
  socket: any | Socket;
  userId: string;
}) {
  const dispatch = useDispatch();
  const [limitValue, setLimitValue] = useState("02");
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState(false);
  const [socketConnection] = useState(socket);
  const { toast } = useToast();
  const navigate = useNavigate();

  const isCreateRoomDialogue = useSelector(
    (state: RootState) => state.roomCreateProp.isCreateRoomDialogOpen
  );

  const handleOnChange = (value: string) => {
    setLimitValue(value);

    if (Number(value) > 20 || Number(value) < 2) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleRoomCreateSubmit = () => {
    const userData = localStorage.getItem("user");
    const parsedData = JSON.parse(userData!);
    dispatch(
      roomData({
        roomName,
        limit: limitValue,
        createdBy: userId,
      })
    );
    parsedData.active = true;
    //might change this later as I will only store active in the context
    localStorage.setItem("user", JSON.stringify(parsedData));

    dispatch(activeUser());

    const roomId = uuidv4();
    console.log(socketConnection);

    socketConnection.emit("createRoom", {
      roomId,
      roomName,
      limit: limitValue,
      userId,
    });

    socketConnection.on("errorWhileCreatingRoom", (err: string) => {
      return toast({
        variant: "destructive",
        title: err,
      });
    });

    socketConnection.on("RoomCreated", (msg: string) => {
      return toast({
        title: msg,
        description: "Completed",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    });
    dispatch(closeCreateRoomDialog());

    //if a user is expired and tried to created he should be redirected to enter userName again.
    //redirect user to the Room Page
    navigate({ to: `/room/$roomId`, params: { roomId } });
  };

  return (
    <div>
      <Dialog
        open={isCreateRoomDialogue}
        onOpenChange={(open) => !open && dispatch(closeCreateRoomDialog())}
      >
        <DialogContent className="sm:max-w-screen-sm">
          <DialogHeader>
            <DialogTitle>Create A Room</DialogTitle>
            <DialogDescription>
              Its Time to Debate!
              {error && (
                <Alert variant="destructive" className="border-none">
                  <AlertCircle className="h-4 w-4" />

                  <AlertTitle>
                    Limit should not be greater than 20 or below 2
                  </AlertTitle>
                </Alert>
              )}
            </DialogDescription>
            <div className="grid gap-2 py-4">
              <div className="grid grid-cols-4 gap-2 items-center">
                <Label htmlFor="name" className="text-left">
                  RoomName
                </Label>
                <Input
                  id="name"
                  value={roomName}
                  onChange={(val) => setRoomName(val.target.value)}
                  className="col-span-3 outline-black"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <Label htmlFor="name" className="text-left">
                  Limit
                </Label>
                <InputOTP
                  maxLength={2}
                  value={limitValue}
                  onChange={(val) => handleOnChange(val)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" onClick={() => handleRoomCreateSubmit()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateRoom;
