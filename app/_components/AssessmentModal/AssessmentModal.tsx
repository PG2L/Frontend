import React, {
    FC,
    useContext
} from 'react';
import styles from './AssessmentModal.module.css';
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    RadioGroup,
    RadioGroupItem
} from "../ui/radio-group";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { AssessmentContext } from "../../_contexts/AssessmentProvider";
import {
    Card,
    CardContent
} from "../ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import AssessmentModalForm from '../forms/AssessmentModalForm/AssessmentModalForm';

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
        </Dialog >

    );
};

export default AssessmentModal;
