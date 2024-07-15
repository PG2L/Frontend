import React, {
    FC,
    useContext
} from 'react';
import styles from './AssessmentModal.module.css';
import { Button } from "@/_components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/_components/ui/dialog";
import { AssessmentContext } from "@/_contexts/AssessmentProvider";
import AssessmentModalForm from '@/_components/forms/AssessmentModalForm/AssessmentModalForm';

interface AssessmentModalProps { }

/**
 * Renders a modal dialog for an assessment.
 * @component AssessmentModal
 * @returns {React.JSX.Element} The rendered component.
 */
const AssessmentModal: FC<AssessmentModalProps> = (): React.JSX.Element => {

    /**
     * Represents the current assessment.
     * @returns The assessment object.
     */
    const assessment: Assessment = useContext(AssessmentContext) as Assessment;

    return (

        assessment &&
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-1/2 mx-auto">Take assessment !</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{ assessment.title }</DialogTitle>
                    <DialogDescription>
                        { assessment.description }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="grid grid-cols-1">
                    <AssessmentModalForm />
                </DialogFooter>
            </DialogContent >
        </Dialog>

    );
};

export default AssessmentModal;
