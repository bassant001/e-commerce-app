interface AdCardProps{
    hint: string;
    title: string;
    description: string;
    code: string;
    discount: string;
    buttonText: string;
    buttonTextColor: string;
    bagroundClass?: string;
}


interface FeaturesCardProps{
icon: React.ReactNode;
title: string;
description: string;
color: string;
}