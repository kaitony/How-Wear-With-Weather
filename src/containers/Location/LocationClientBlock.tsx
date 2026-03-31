"use client";

import { use, useState } from "react";

import { MapPin, Locate, TextCursorInput } from "lucide-react";

import { useForm } from "@tanstack/react-form-nextjs";

import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/dialog";

import { Field, FieldError } from "@/components/field";
import { Input } from "@/components/input";

import { LocationContext, LocationDialogContext } from "./LocationClientContainer";

export function CurrentLocation() {
  const { addressState } = use(LocationContext);
  return (
    <div className="flex flex-1 items-center p-6 gap-x-6">
      <MapPin className="w-16 h-16 text-green-500" />
      <div className="flex flex-1 flex-col gap-y-2 text-left">
        <h3 className="text-lg text-gray-800 font-semibold">현재 위치</h3>
        <p className="text-sm text-gray-600">{addressState}</p>
      </div>
    </div>
  );
}

export function GeoLocationButton() {
  const { getGeolocationFunc } = use(LocationContext);
  return (
    <button onClick={getGeolocationFunc} className="flex flex-1 items-center p-6 gap-x-6 rounded-3xl border-2 transition-all hover:scale-[1.01] hover:border-blue-500 active:scale-[0.99] cursor-pointer">
      <Locate className="w-16 h-16 text-blue-500" />
      <div className="flex flex-1 flex-col gap-y-2 text-left">
        <h3 className="text-lg text-gray-800 font-semibold">기기 위치 사용</h3>
        <p className="text-sm text-gray-600">기기의 위치 정보를 사용하여 자동으로 주소를 입력합니다.</p>
      </div>
    </button>
  );
}

export function SearchLocation() {
  const { addressDialogOpen, submitError, locationFormSchema, setAddressDialogOpen, searchLocationFunc } = use(LocationDialogContext);
  const form = useForm({
    defaultValues: {
      address: "",
    },
    validators: {
      onSubmit: locationFormSchema,
    },
    onSubmit: ({ value }) => {
      searchLocationFunc(value.address);
    },
  });

  return (
    <Dialog open={addressDialogOpen} onOpenChange={setAddressDialogOpen}>
      <DialogTrigger asChild>
        <button className="flex flex-1 items-center p-6 gap-x-6 rounded-3xl border-2 hover:scale-[1.01] active:scale-[0.99] hover:border-red-500 cursor-pointer">
          <TextCursorInput className="w-16 h-16 text-red-500" />
          <div className="flex flex-1 flex-col gap-y-2 text-left">
            <h3 className="text-lg text-gray-800 font-semibold">주소 검색</h3>
            <p className="text-sm text-gray-600">주소를 입력하여 위치를 검색합니다.</p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="flex flex-1 flex-col gap-y-6">
          <DialogHeader>
            <DialogTitle>주소 검색</DialogTitle>
            <DialogDescription>주소를 입력하여 위치를 검색합니다.</DialogDescription>
          </DialogHeader>
          <form.Field
            name="address"
            children={(field) => (
              <Field>
                <Input id={field.name} name={field.name} value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} type="text" autoFocus autoComplete="off" placeholder="예: 서울특별시 강남구 테헤란로 123" className="w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500" />
                <FieldError errors={[...field.state.meta.errors, ...(submitError ? [{ message: submitError }] : [])]} />
              </Field>
            )}
          />
          <DialogFooter>
            <Button type="submit" className="w-full py-6 rounded-2xl text-lg bg-linear-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg">
              검색
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function NextButton() {
  const { addressState, nextButtonClickFunc } = use(LocationContext);

  const disabled = addressState === "";

  return (
    <Button onClick={nextButtonClickFunc} disabled={disabled} className="w-full py-6 rounded-2xl text-lg bg-linear-to-r from-indigo-400 to-purple-400 hover:from-indigo-500 hover:to-purple-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-lg">
      다음
    </Button>
  );
}
