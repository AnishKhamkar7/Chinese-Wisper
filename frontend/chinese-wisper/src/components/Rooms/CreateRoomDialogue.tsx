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

function CreateRoomDialogue() {
  const dispatch = useDispatch();
  const [limitValue, setLimitValue] = useState("02");
  const [error, setError] = useState(false);

  const isCreateRoomDialogue = useSelector(
    (state: RootState) => state.roomCreateProp.isCreateRoomDialogOpen
  );

  console.log(isCreateRoomDialogue);

  const handleOnChange = (value: string) => {
    setLimitValue(value);
    if (Number(value) > 20 || Number(value) < 2) {
      setError(true);
    } else {
      setError(false);
    }
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
                  value=""
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
            <Button type="button">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateRoomDialogue;
