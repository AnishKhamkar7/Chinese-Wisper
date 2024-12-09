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

function CreateRoomDialogue() {
  return (
    <div>
      <Dialog open={true}>
        <DialogContent className="sm:max-w-screen-sm">
          <DialogHeader>
            <DialogTitle>Create A Room</DialogTitle>
            <DialogDescription>Its Time to Debate!</DialogDescription>
            <div className="grid gap-2 py-4">
              <div className="grid grid-cols-4 gap-2 items-center">
                <Label htmlFor="name" className="text-left">
                  RoomName
                </Label>
                <Input
                  id="name"
                  value="new"
                  className="col-span-3 outline-black"
                />
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <Label htmlFor="name" className="text-left">
                  UserName
                </Label>
                <Input
                  id="name"
                  value="new"
                  className="col-span-3 outline-black"
                />
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
