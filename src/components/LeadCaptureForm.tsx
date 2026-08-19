import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { cn } from '../lib/utils';
import { Loader2, CheckCircle2 } from 'lucide-react';

const orderSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email address"),
  taskType: z.string().min(1, "Task type is required"),
  pages: z.number().min(1, "At least 1 page required"),
  deadline: z.string().min(1, "Deadline is required"),
  additionalInstructions: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

export const LeadCaptureForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      pages: 1,
    }
  });

  const onSubmit = async (data: OrderFormValues) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const orderData = {
        ...data,
        userId: auth.currentUser?.uid || null,
        status: 'pending',
        createdAt: serverTimestamp(),
        // Add default cost calculation or pricing logic here if needed
        totalCost: data.pages * 10,
      };

      await addDoc(collection(db, 'orders'), orderData);
      
      setIsSuccess(true);
      reset();
    } catch (err: any) {
      console.error("Error submitting order:", err);
      setError("Failed to submit your order. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle2 className="w-12 h-12 text-green-500 mb-4" />
        <h3 className="text-xl font-semibold text-green-800">Order Received!</h3>
        <p className="text-green-600">We've received your inquiry and will be in touch shortly.</p>
        <button className="mt-4 text-sm text-green-700 underline" onClick={() => setIsSuccess(false)}>Submit another order</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900">Get a Quote</h2>
      
      {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input {...register("fullName")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input {...register("email")} type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Assignment Type</label>
        <select {...register("taskType")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2">
            <option value="">Select an option</option>
            <option value="essay">Essay</option>
            <option value="research">Research Paper</option>
            <option value="thesis">Thesis</option>
        </select>
        {errors.taskType && <p className="text-red-500 text-xs mt-1">{errors.taskType.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Pages</label>
          <input {...register("pages", { valueAsNumber: true })} type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Deadline</label>
          <input {...register("deadline")} type="datetime-local" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Instructions</label>
        <textarea {...register("additionalInstructions")} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" rows={3}></textarea>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={cn(
          "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
          isSubmitting && "opacity-75 cursor-not-allowed"
        )}
      >
        {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : "Submit Order Inquiry"}
      </button>
    </form>
  );
};
