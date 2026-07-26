import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";


interface Props {
    leadId:number;
}


export default function ContactCard({
    leadId
}:Props) {

    return (
        <Card>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Contacts
                </h2>

                <Button>
                    Add Contact
                </Button>
            </div>

            <div className="mt-5 rounded-lg p-4 hover-surface">
                No contacts added
            </div>
        </Card>
    );
}